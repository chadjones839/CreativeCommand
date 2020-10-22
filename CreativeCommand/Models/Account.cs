using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CreativeCommand.Models
{
    public class Account
    {
        public int Id { get; set; }

        [Required]
        [StringLength(72)]
        public string Company { get; set; }

        [Required]
        [MaxLength(62)]
        public string Address { get; set; }

        [Required]
        [MaxLength(48)]
        public string City { get; set; }

        [Required]
        [MaxLength(2)]
        public string State { get; set; }

        [Required]
        public int ZipCode { get; set; }

        [Required]
        public DateTime DateCreated { get; set; }

        [Required]
        public int SalesUserId { get; set; }
        public User SalesUser { get; set; }

        [Required]
        public int ManagerUserId { get; set; }
        public User ManagerUser { get; set; }

    }
}
