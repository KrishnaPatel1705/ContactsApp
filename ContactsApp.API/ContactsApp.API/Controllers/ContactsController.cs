using ContactsApp.DTO.Models;
using ContactsApp.Interface;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsApp.API.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("[controller]/[action]/")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly IContacts _repo;

        public ContactsController(IContacts repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetContactsData()
        {
            List<Contacts> ContactsData = _repo.GetContactsData();
            return Ok(ContactsData);
        }
        [HttpPost]
        public IActionResult AddContactsData(Contacts contact)
        {
            bool IsSuccessful = _repo.AddContactsData(contact);
            return Ok(IsSuccessful);
        }
        [HttpGet]
        public IActionResult GetContactsDataByID(int ContactID)
        {
            Contacts ContactsData = _repo.GetContactsDataByID(ContactID);
            return Ok(ContactsData);
        }
        [HttpPut]
        public IActionResult UpdateContactsData(Contacts contact)
        {
            bool IsSuccessful = _repo.UpdateContactsData(contact);
            return Ok(IsSuccessful);
        }

        [HttpDelete]
        public IActionResult DeleteContactsData(int contactID)
        {
            bool IsSuccessful = _repo.DeleteContactsData(contactID);
            return Ok(IsSuccessful);
        }
    }
}