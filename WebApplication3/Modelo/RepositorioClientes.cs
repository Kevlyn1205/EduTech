using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication3.Modelo
{
    public class RepositorioClientes
    {
        private string connectionString;
        public RepositorioClientes()
        {
            connectionString = @"Integrated Security=true; Initial Catalog=Clientes; Data Source=DESKTOP-TCFT49L; ";

        }
        public IDbConnection Connection
        {
            get
            {
                return new SqlConnection(connectionString);
            }
        }
        public void Add(Clientes clnts)
        {
            using(IDbConnection dbConnection=Connection)
            {
                string sQuery = @"INSERT INTO Clientes (Nombre, Telefono, Email) VALUES (@Nombre, @Telefono, @Email)";
                Connection.Open();
                Connection.Execute(sQuery, clnts);
            }
        }

        public IEnumerable<Clientes> GetAll()
        {
            using (IDbConnection dbConnection = Connection)
            {
                string sQuery = @"SELECT * FROM Clientes";
                dbConnection.Open();
                return dbConnection.Query<Clientes>(sQuery);
            }
        }
        public Clientes GetById(int Codigo)
        {
            using (IDbConnection dbConnection = Connection)
            {
                string sQuery = @"SELECT * FROM Clientes WHERE Codigo=@Codigo";
                dbConnection.Open();
                return dbConnection.Query<Clientes>(sQuery, new { Id = Codigo }).FirstOrDefault();
            }
        }
        public void Delete(int Codigo)
        {
            using (IDbConnection dbConnection = Connection)
            {
                string sQuery = @"DELETE FROM Clientes WHERE Codigo=@Codigo";
                dbConnection.Open();
                dbConnection.Execute(sQuery,new { Codigo = Codigo });
            }
        }
        public void Update(Clientes clie)
        {
            using (IDbConnection dbConnection = Connection)
            {
                string sQuery = @"UPDATE Clientes SET Nombre=@Nombre, Telefono=@Telefono, Email=@Email WHERE Codigo=@Codigo";
                dbConnection.Open();
                dbConnection.Query<Clientes>(sQuery, clie);
            }
        }
    }
}
