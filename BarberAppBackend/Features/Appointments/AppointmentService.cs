
using BarberAppBackend.Data;
using BarberAppBackend.Features.Appointments;
using BarberAppBackend.Features.Appointments.Entities;
using BarberAppBackend.Features.Appointments.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BarberAppBackend.Features.Appointments
{
    public class AppointmentService : IAppointmentService
    {
        private readonly DateTime ActualDateTime = DateTime.UtcNow;
        private readonly SqlServerDbContext _db;
        public AppointmentService(SqlServerDbContext db)
        {
            _db = db;
        }
        public void CreateAppointment(CreateAppointmentDto createAppointmentDto)
        {

            Appointment appointment = new Appointment()
            {
                CustomerId = createAppointmentDto.CustomerId,
                ServiceId = createAppointmentDto.ServiceId,
                StylistId = createAppointmentDto.StylistId,
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

            if (CanCancelAppointment(Appointment.StartDate))
            {
                Appointment.CancelledAt = ActualDateTime;
                Appointment.Status = APPOINTMENT_STATUS.CANCELLED;
                Appointment.PaymentStatus = APPOINTMENT_PAYMENT_STATUS.CANCELLED;

            }
        }

        public bool CanCancelAppointment(DateTime StartDate)
        {
            TimeSpan TimeDifference = StartDate - ActualDateTime ;

            //If there is under 3 hours left before appointment can cancel
            if (TimeDifference.TotalHours <= 5)
            {
                return false;
            }
            
            return true;
        }

        public void RescheduleAppointment(long AppointmentId)
        {
            //TODO: Reassign appointment date
        }
    }
}
