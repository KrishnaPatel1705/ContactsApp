using ContactsApp.DTO.Error;
using System;

namespace ContactsApp.Interface
{
    public interface IErrorHandler
    {
        void ApplicationError(ErrorHandling model);

        string HttpException(dynamic serverResponse);

        string GetGuid();
    }
}
