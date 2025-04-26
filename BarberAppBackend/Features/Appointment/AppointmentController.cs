using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BarberAppBackend.Features.Appointment
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        public AppointmentController() { }

        [HttpPost]
        public IActionResult CreateAppointment()
        {
            return Ok();
        }

        [HttpGet]
        public IActionResult GetAppointments()
        {
            return Ok();
        }

    }
}
