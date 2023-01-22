using ContactsApp.DTO.Error;
using ContactsApp.Interface;
using NLog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ContactsApp.Datalayer
{
    public class ErrorHandlerRepo : IErrorHandler
    {
        private static Logger _logger = LogManager.GetCurrentClassLogger();

        public void ApplicationError(ErrorHandling model)
        {
            string TheGuid = GetGuid();
            _logger.Log(LogLevel.Error, TheGuid + " - " + model.Error);
            throw (new Exception("An error has occured with the application. Please try again later"));
        }

        public string GetGuid()
        {
            Guid TheGuid = Guid.NewGuid();
            return TheGuid.ToString();
        }

        public string HttpException(dynamic serverResponse)
        {
            string TheGuid = GetGuid();
            string ErrorMessage;

            if (serverResponse.Message != "An error has occurred.")
            {
                ErrorMessage = "An error has occured with the website. Please try again later";
                _logger.Log(LogLevel.Error, TheGuid + " - " + serverResponse.Message);
            }
            else
            {
                ErrorMessage = serverResponse.ExceptionMessage;
            }

            return ErrorMessage;
        }
    }
}
