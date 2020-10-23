using System.ComponentModel.DataAnnotations;

namespace CreativeCommand.Models
{
    public class ScheduleType
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(20)]
        public string Name { get; set; }
    }
}