using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BarberAppBackend.Features.Appointments.Entities
{
    [Table("appointments")]
    public class Appointment
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }
        [Column("customer_id")]
        public int? CustomerId { get; set; }

        [Column("stylist_id")]
        public int StylistId { get; set; }
        [Column("service_id")]
        public int ServiceId { get; set; }
        [Column("status_id")]
        public APPOINTMENT_STATUS Status { get; set; }

        [Column("start_date")]
        public DateTime StartDate { get; set; }
        [Column("completed_at")]
        public DateTime CreatedAt { get; init; }

        [Column("cancelled_at")]
        public DateTime? CancelledAt { get; set; } = null;

        [Column("completed_at")]
        public DateTime? CompletedAt { get; set; } = null;

        [Column("payment_status")]
        public APPOINTMENT_PAYMENT_STATUS PaymentStatus { get; set; }
    }

    public enum APPOINTMENT_STATUS
    {
        CANCELLED = 0,
        COMPLETED = 1,
        CONFIRMED = 2,
        PENDING = 3,
    }

    public enum APPOINTMENT_PAYMENT_STATUS
    {
        PENDING = 0,
        PAID = 1,
        PARTIAL = 2,
        CANCELLED = 3
    }
}
