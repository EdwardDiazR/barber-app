using BarberAppBackend.Features.Appointments.Entities.Dtos;
using BarberAppBackend.Features.Appointments.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BarberAppBackend.Features.Appointments
{
    [Route("api/v1/appointments")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly IAppointmentService _appointmentsService;
        public AppointmentController(IAppointmentService appointmentService)
        {
            _appointmentsService = appointmentService;
        }

        [HttpGet]
        public IActionResult GetAppointmensByDate([FromQuery]DateTime Date)
        {
            try
            {
                var appointments = _appointmentsService.GetAppointmentsByDate(Date);
                var response = new
                {
                    Data = appointments,
                    StatusCode = 200,
                    Message = "Citas cargadas exitosamente"
                };
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }


        [HttpPost]
        public IActionResult CreateAppointment(CreateAppointmentDto createAppointmentDto)
        {
            try
            {
                _appointmentsService.CreateAppointment(createAppointmentDto);
                return Ok("Cita creada con exito");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPost("cancel")]
        public IActionResult CancelAppointment([FromBody] long Id)
        {
            try
            {
                _appointmentsService.CancelAppointment(Id);
                return Ok("Cita borrada con exito");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        public IActionResult RescheduleAppointment(long Id, DateTime NewDate)
        {
            try
            {
                _appointmentsService.RescheduleAppointment(Id, NewDate);
                return Ok("Rescheduled");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
