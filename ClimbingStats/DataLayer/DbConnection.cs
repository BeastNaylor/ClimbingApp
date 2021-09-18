using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SQLite;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ClimbingStats.DataLayer
{
    public class DbConnection
    {
        public async static Task<SQLiteConnection> GetDbConnection(string dbFile) {
            var connectionString = $"Data Source={dbFile}";
            if (!File.Exists(dbFile))
            {
                SQLiteConnection.CreateFile(dbFile);
                await InitialiseDb(connectionString);
            }
            return new SQLiteConnection(connectionString);
        }

        private static async Task InitialiseDb(string connectionString)
        {
            using (var cnn = new SQLiteConnection(connectionString))
            {
                cnn.Open();
                await cnn.ExecuteAsync(
                    @"create table if not exists Routes
                            (
                                ID                                   integer primary key AUTOINCREMENT,
                                Colour                               varchar(100) not null,
                                Section                              varchar(100) not null,
                                Position                             integer not null,
                                DateAdded                            text not null,
                                IsActive                             bool not null
                            )");
            }
        }
    }
}
