using ContactsApp.Interface;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ContactsApp.Datalayer
{
    public class DBManagerRepo : IDBManager
    {
        private static IConfiguration _config;
        private IDbConnection _con;
        public DBManagerRepo(IConfiguration config, IDbConnection con)
        {
            _config = config;
            _con = con;
        }

        public IDbConnection GetDbConnection(string connectionStringKey)
        {
            _con.ConnectionString = _config.GetConnectionString(connectionStringKey);
            return _con;
        }
    }
}
