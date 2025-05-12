using BarberAppBackend.Features.Users.Entities;
using System.ComponentModel.DataAnnotations;

namespace BarberAppBackend.Features.Commerces.Entities
{
    public class Business
    {
        [Key]
        public int Id { get; set; }
        public required string Name { get; set; }
        public int Type { get; set; }
        public int StatusCode { get; set; }
        public bool IsDeleted { get; set; } = false;
        public bool IsVerified { get; set; }
        public string Description { get; set; }

        //Counters
        public int UpdatedTimes { get; set; } = 0;
        public long AttendedCustomers { get; set; } = 0;
        public double Ranking { get; set; } = 0.00;
        public DateTime CreatedAt { get; set; }
        public DateTime? LastUpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
        public DateTime FoundationDate { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string? ZipCode { get; set; }

        //Multimedia
        public string LogoUrl { get; set; }

        //Time2
        //TODO: Bussiness hour
        public ICollection<User> Admins { get; set; }
        public ICollection<User> Stylists { get; set; }
        public ICollection<string> Services { get; set; }
    }
}
