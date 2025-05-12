using BarberAppBackend.Features.Commerces.Entities;

namespace BarberAppBackend.Features.Reviews.Entities
{
    public class Review
    {
        public int Id { get; set; }
        public required int BusinessId { get; set; } = 0;
        public required int UserId { get; set; }
        public required int Rating { get; set; } //From 1 to 5
        public string? Comment { get; set; }
    }
}
