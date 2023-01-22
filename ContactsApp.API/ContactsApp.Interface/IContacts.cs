using ContactsApp.DTO.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ContactsApp.Interface
{
    public interface IContacts
    {
        List<Contacts> GetContactsData();
        bool AddContactsData(Contacts contact);
        Contacts GetContactsDataByID(int ContactID);
        bool UpdateContactsData(Contacts contact);
        bool DeleteContactsData(int contactID);
    }
}
