using ServerTrace.Models;
using System.Data;
using System.Data.SqlClient;

namespace ServerTrace.SignalR
{
    public class DevTracerDbRepository
    {
        string connectionString;

        public DevTracerDbRepository(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public List<DEV_TracerDB> GetDevTracerDb()
        {
            var query = @"SELECT Top 1 ID, [DataOra], [Societa], [Agenzia],[NomeApplicazione], [Utente],[Pagina], [Descrizione],[IdTipoTraccia], [IdTipoTracerCategories] FROM [dbo].[DEV_TracerDB]";
            DataTable dataTable = new DataTable();
            var tracerList = new List<DEV_TracerDB>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.CommandType = CommandType.Text;
                        //command.CommandText = query;
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                var tracer = new DEV_TracerDB();

                                tracer.Id = Convert.ToInt32(reader["ID"]);
                                tracer.DataOra = Convert.ToDateTime(reader["colore"].ToString());
                                tracer.Societa = reader["Societa"].ToString();
                                tracer.Agenzia = reader["Agenzia"].ToString();
                                tracer.NomeApplicazione = reader["NomeApplicazione"].ToString();
                                tracer.Utente = reader["Utente"].ToString();
                                tracer.Pagina = reader["Pagina"].ToString();
                                tracer.Descrizione = reader["Descrizione"].ToString();
                                tracer.Descrizione = reader["Descrizione"].ToString();
                                tracer.IdTipoTraccia = Convert.ToInt32(reader["IdTipoTraccia"]);
                                tracer.IdTracerCategories = Convert.ToInt32(reader["IdTracerCategories"]);
                                tracerList.Add(tracer);
                            }

                            //dataTable.Load(reader);

                        }
                    }
                    return tracerList;
                }
                catch (Exception ex)
                {
                    throw;
                }
                finally
                {
                    connection.Close();
                }
            }
        }
    }
}
