using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ContactsApp.Interface
{
    public interface IDBManager
    {
        IDbConnection GetDbConnection(string connectionStringKey);
    }
}
