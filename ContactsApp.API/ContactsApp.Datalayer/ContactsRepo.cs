using ContactsApp.DTO.Models;
using ContactsApp.DTO.Error;
using ContactsApp.Interface;
using System;
using System.Data;
using System.Collections.Generic;
using Dapper;
using System.Linq;

namespace ContactsApp.Datalayer
{
    public class ContactsRepo : IContacts
    {
        private readonly IErrorHandler _error;
        private readonly IDBManager _dbManager;
        private const string ContactsAppApi = "ContactsAppApi";

        public ContactsRepo(IDBManager dbManager)
        {
            _error = new ErrorHandlerRepo();
            _dbManager = dbManager;
        }
        public List<Contacts> GetContactsData()
        {
            var ContactsData = new List<Contacts>();
            try
            {
                using (IDbConnection Con = _dbManager.GetDbConnection(ContactsAppApi))
                {
                    ContactsData = Con.Query<Contacts>("SPGetContactsData",
                                           commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception e)
            {
                _error.ApplicationError(new ErrorHandling
                {
                    Error = e
                });

            }
            return ContactsData;
        }

        public bool AddContactsData(Contacts contact)
        {
            bool IsSuccessful = false;
            try
            {
                using (IDbConnection Con = _dbManager.GetDbConnection(ContactsAppApi))
                {
                    Con.Execute("SPAddContactsData", new
                    {
                        FirstName = contact.FirstName,
                        LastName = contact.LastName,
                        PhoneNumber = contact.PhoneNumber,
                    },
                    commandType: CommandType.StoredProcedure);
                    IsSuccessful = true;
                }
            }
            catch (Exception e)
            {
                _error.ApplicationError(new ErrorHandling
                {
                    Error = e
                });
                IsSuccessful = false;
            }
            return IsSuccessful;
        }
        public Contacts GetContactsDataByID(int ContactID)
        {
            var ContactsData = new Contacts();
            try
            {
                using (IDbConnection Con = _dbManager.GetDbConnection(ContactsAppApi))
                {
                    ContactsData = Con.Query<Contacts>("SPGetContactsDataByID", new
                    {
                        ContactID = ContactID
                    },
                    commandType: CommandType.StoredProcedure).FirstOrDefault();
                }
            }
            catch (Exception e)
            {
                _error.ApplicationError(new ErrorHandling
                {
                    Error = e
                });

            }
            return ContactsData;
        }

        public bool UpdateContactsData(Contacts contact)
        {
            bool IsSuccessful = false;
            try
            {
                using (IDbConnection Con = _dbManager.GetDbConnection(ContactsAppApi))
                {
                    Con.Execute("SPUpdateContactsData", new
                    {
                        ContactID = contact.ContactID,
                        FirstName = contact.FirstName,
                        LastName = contact.LastName,
                        PhoneNumber = contact.PhoneNumber,
                    },
                    commandType: CommandType.StoredProcedure);
                    IsSuccessful = true;
                }
            }
            catch (Exception e)
            {
                _error.ApplicationError(new ErrorHandling
                {
                    Error = e
                });
                IsSuccessful = false;
            }
            return IsSuccessful;
        }

        public bool DeleteContactsData(int contactID)
        {
            bool IsSuccessful = false;
            try
            {
                using (IDbConnection Con = _dbManager.GetDbConnection(ContactsAppApi))
                {
                    Con.Execute("SPDeleteContactsData", new
                    {
                        ContactID = contactID,
                    },
                    commandType: CommandType.StoredProcedure);
                    IsSuccessful = true;
                }
            }
            catch (Exception e)
            {
                _error.ApplicationError(new ErrorHandling
                {
                    Error = e
                });
                IsSuccessful = false;
            }
            return IsSuccessful;
        }
    }
}
