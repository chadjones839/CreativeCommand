using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CreativeCommand.Models
{
    public class CampaignStatus
    {
        public int Id { get; set; }

        [Required]
        public int CampaignId { get; set; }

        public Campaign Campaign { get; set; }

        [Required]
        public bool IsSold { get; set; }

        [Required]
        public bool IsApproved { get; set; }

        [Required]
        public bool CreativeSubmitted { get; set; }

        [Required]
        public bool InProduction { get; set; }

        [Required]
        public bool IsScheduled { get; set; }

        [Required]
        public bool IsComplete { get; set; }

    }
}
