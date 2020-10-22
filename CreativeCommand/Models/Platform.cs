using System.ComponentModel.DataAnnotations;

namespace CreativeCommand.Models
{
    public class Platform
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(30)]
        public string Name { get; set; }
    }
}