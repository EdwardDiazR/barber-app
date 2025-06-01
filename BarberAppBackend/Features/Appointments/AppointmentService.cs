
using BarberAppBackend.Data;

using BarberAppBackend.Features.Appointments.Entities;
using BarberAppBackend.Features.Appointments.Entities.Dtos;
using BarberAppBackend.Features.Appointments.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BarberAppBackend.Features.Appointments
{
    public class AppointmentService : IAppointmentService
    {
        private const int LimitPerDay = 3;
        private readonly DateTime ActualDateTime = DateTime.UtcNow;
        private readonly SqlServerDbContext _db;
        public AppointmentService(SqlServerDbContext db)
        {

            _db = db;
        }
        public async Task<IEnumerable<Appointment>> GetAppointmentsByDate(DateTime Date)
        {

            IEnumerable<Appointment> Appointments = await _db.Appointments
                .Where(a => a.StartDate.Date == Date.Date)
                .ToListAsync();
            return Appointments;

        }
        public void CreateAppointment(CreateAppointmentDto createAppointmentDto)
        {
            //TODO: Check if business is active and can receive appointments
            // Check if is not banned or fraudster

            Appointment appointment = new Appointment()
            {
                CustomerId = createAppointmentDto.CustomerId,
                ServiceId = createAppointmentDto.ServiceId,
                StylistId = createAppointmentDto.StylistId,
                BusinessId = createAppointmentDto.BusinessId,
                CreatedAt = ActualDateTime,
                StartDate = createAppointmentDto.StartDate,
                CancelledAt = null,
                CompletedAt = null,
                PaymentStatus = createAppointmentDto.IsPaid ? APPOINTMENT_PAYMENT_STATUS.PAID : APPOINTMENT_PAYMENT_STATUS.PENDING,
                Status = APPOINTMENT_STATUS.PENDING,

            };

            _db.Appointments.Add(appointment);
            _db.SaveChanges();
        }
        public void CancelAppointment(long AppointmentId)
        {
            var Appointment = _db.Appointments
                .AsNoTracking()
                .FirstOrDefault(a => a.Id == AppointmentId);

            if (Appointment == null)
            {
                throw new ArgumentNullException("Esta cita no fue encontrada.");
            }

            //If appointment is cancelled or confirmed, 
            if (Appointment.Status == APPOINTMENT_STATUS.CANCELLED)
            {
                throw new Exception("Esta cita ya ha sido cancelada");
            }

            if (CheckIfCanCancelAppointment(Appointment.StartDate))
            {
                Appointment.CancelledAt = ActualDateTime;
                Appointment.Status = APPOINTMENT_STATUS.CANCELLED;
                Appointment.PaymentStatus = APPOINTMENT_PAYMENT_STATUS.CANCELLED;

                _db.Update(Appointment);
                _db.SaveChanges();
            }
        }
        public bool CheckIfCanCancelAppointment(DateTime StartDate)
        {
            TimeSpan TimeDifference = StartDate - ActualDateTime;

            //If there is under 3 hours left before appointment can cancel
            if (TimeDifference.TotalHours <= 5)
            {
                return false;
            }

            return true;
        }
        public void RescheduleAppointment(long AppointmentId, DateTime NewDate)
        {
            //TODO: Reassign appointment date

            if (NewDate < ActualDateTime)
            {
                throw new Exception("No puedes agendar una cita en fecha pasada");
            }

            var Appointment = _db.Appointments.Find(AppointmentId);

            if (Appointment == null)
            {
                throw new ArgumentNullException("No se encontro esta cita con esa referencia");
            }

            Appointment.StartDate = NewDate;
            Appointment.Status = APPOINTMENT_STATUS.PENDING;

            _db.Appointments.Update(Appointment);
            _db.SaveChanges();

        }

        public void DeleteAppointment(long AppointmentId)
        {
            var Appointment = _db.Appointments.Find(AppointmentId);

            ArgumentNullException.ThrowIfNull(Appointment);

            Appointment.IsDeleted = true;
            Appointment.Status = APPOINTMENT_STATUS.CANCELLED;
            Appointment.DeletedAt = ActualDateTime;

            _db.Update(Appointment);
            _db.SaveChanges();

        }
    }
}
