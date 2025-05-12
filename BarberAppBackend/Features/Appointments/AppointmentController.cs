using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BarberAppBackend.Features.Appointment
{
    [Route("api/v1/appointments")]
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
        public IActionResult GetTodaysAppointment()
        {
            return Ok();
        }

    }
}
