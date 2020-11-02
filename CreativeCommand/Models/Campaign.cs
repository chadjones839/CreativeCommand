using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CreativeCommand.Models
{
    public class Campaign
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public int? Revenue { get; set; }

        [Required]
        public int ScheduleTypeId { get; set; }
        public ScheduleType ScheduleType { get; set; }

        [Required]
        public int PlatformId { get; set; }
        public Platform Platform { get; set; }

        [Required]
        public DateTime CreateDate { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        public int Impressions { get; set; }

        [Required]
        public int Audience { get; set; }

        [Required]
        public int AccountId { get; set; }
        public Account Account { get; set; }


    }
}