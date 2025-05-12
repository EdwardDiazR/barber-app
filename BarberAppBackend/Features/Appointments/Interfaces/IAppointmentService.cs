using BarberAppBackend.Features.Appointments.Entities;

namespace BarberAppBackend.Features.Appointments.Interfaces
{
    public interface IAppointmentService
    {
        public void CreateAppointment(CreateAppointmentDto createAppointmentDto);
    }
}
