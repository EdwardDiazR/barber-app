using BarberAppBackend.Features.Appointments.Entities.Dtos;

namespace BarberAppBackend.Features.Appointments.Interfaces
{
    public interface IAppointmentService
    {
        public void CreateAppointment(CreateAppointmentDto createAppointmentDto);
    }
}
