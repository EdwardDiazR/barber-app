namespace BarberAppBackend.Features.Appointment.Entities
{
    public record CreateAppointmentDto(
        DateTime StartDate,
        int ServiceId,
        int CustomerId,
        int StylistId,
        bool IsPaid
        );

}
