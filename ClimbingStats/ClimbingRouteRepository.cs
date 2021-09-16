using ClimbingStats.Models;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.Sqlite;
using Dapper;

namespace ClimbingStats
{
    public class ClimbingRouteRepository : IClimbingRouteRepository
    {
        private readonly string _connectionString;

        public ClimbingRouteRepository(IOptions<ClimbingConfig> options)
        {
            _connectionString = options.Value.ClimbingDb;
            CreateDbIfNotExists();
        }

        public IEnumerable<Route> GetRoutes()
        {
            const string sql = "SELECT * FROM Routes";
            using (var conn = new SqliteConnection(_connectionString))
            {
                conn.Open();
                return conn.Query<Route>(sql);
            };
        }

        public void InsertRoute(Route route)
        {
            const string sql = @"INSERT INTO Routes
                                    (Colour, Section, Position, DateAdded, IsActive)
                                VALUES
                                    (@Colour, @Section, @Position, @DateAdded, @IsActive)";
            using (var conn = new SqliteConnection(_connectionString))
            {
                conn.Open();
                conn.Execute(sql,
                    new
                    {
                        Colour = route.Colour,
                        Section = route.Section,
                        Position = route.Position,
                        DateAdded = DateTime.Now,
                        IsActive = true
                    });
            };
        }

        private void CreateDbIfNotExists()
        {
            using (var cnn = new SqliteConnection(_connectionString))
            {
                cnn.Open();
                cnn.Execute(
                    @"create table if not exists Routes
                (
                    ID                                   integer primary key AUTOINCREMENT,
                    Colour                                varchar(100) not null,
                    Section                              varchar(100) not null,
                    Position                             integer not null,
                    DateAdded                            integer not null,
                    IsActive                             bool not null
                )");
            }
        }
    }
}
