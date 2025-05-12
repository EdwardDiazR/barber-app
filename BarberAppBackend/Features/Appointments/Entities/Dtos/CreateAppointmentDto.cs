namespace BarberAppBackend.Features.Appointments.Entities.Dtos
{
    public record CreateAppointmentDto(
        DateTime StartDate,
        int ServiceId,
        int CustomerId,
        int StylistId,
        int BusinessId,
        bool IsPaid,
        string? Notes
        );

}
