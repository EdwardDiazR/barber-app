using BarberAppBackend.Features.Appointments.Entities;
using BarberAppBackend.Features.Appointments.Entities.Dtos;

namespace BarberAppBackend.Features.Appointments.Interfaces
{
    public interface IAppointmentService
    {
        Task<IEnumerable<Appointment>> GetAppointmentsByDate(DateTime Date);
        void CreateAppointment(CreateAppointmentDto createAppointmentDto);
        void CancelAppointment(long AppointmentId);
        void RescheduleAppointment(long AppointmentId, DateTime NewDate);
        void DeleteAppointment(long AppointmentId);
        bool CheckIfCanCancelAppointment(DateTime StartDate);
    }
}
