using System.ComponentModel.DataAnnotations;

namespace BarberAppBackend.Features.Users.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [AllowedValues(["STYLIST","CUSTOMER","ADMIN"])]
        public string Role { get; set; }
        public string? Alias { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? ConfirmedPassword { get; set; }
        public bool IsEmailConfirmed { get; set; } = false;
        public string PhoneNumber { get; set; }
        public char Gender { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int LoginCount { get; set; } = 0;
    }
}
