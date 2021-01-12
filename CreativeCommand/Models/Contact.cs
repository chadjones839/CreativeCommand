using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CreativeCommand.Models
{
    public class Contact
    {
        public int Id { get; set; }

        [StringLength(50)]
        public string FirstName { get; set; }
        
        [StringLength(50)]
        public string LastName { get; set; }
     
        [StringLength(50)]
        public string Title { get; set; }
   
        [MaxLength(10)]
        public int? CellPhone { get; set; }
   
        [MaxLength(10)]
        public int? OfficePhone { get; set; }



        [StringLength(70)]
        public string Email { get; set; }
        public int AccountId { get; set; }
        public Account Account { get; set; }
        public string FullName
        {
            get
            {
                return $"{FirstName} {LastName}";
            }
        }
    }
}
