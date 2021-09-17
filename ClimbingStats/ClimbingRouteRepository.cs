using ClimbingStats.Models;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SQLite;
using Dapper;
using System.IO;
using ClimbingStats.Models.Enums;

namespace ClimbingStats
{
    public class ClimbingRouteRepository : IClimbingRouteRepository
    {
        private readonly string _connectionString;

        public ClimbingRouteRepository(IOptions<ClimbingConfig> options)
        {
            _connectionString = options.Value.ClimbingDb;
            CreateDbIfNotExists().Wait();
        }

        public async Task ClearRoutes(Section section)
        {
            const string sql = "UPDATE Routes SET IsActive = false WHERE section = @Section";
            using (var conn = new SQLiteConnection(_connectionString))
            {
                conn.Open();
                await conn.ExecuteAsync(sql, new { section });
            };
        }

        public async Task<IEnumerable<Route>> GetRoutes(Section section)
        {
            const string sql = "SELECT ID, Colour, Section, Position, DateAdded, IsActive " +
                "FROM Routes WHERE section = @Section or @Section IS NULL AND IsActive = true";
            using (var conn = new SQLiteConnection(_connectionString))
            {
                conn.Open();
                return await conn.QueryAsync<Route>(sql, new { section });
            };
        }

        public async Task<IEnumerable<Route>> GetAllRoutes()
        {
            const string sql = "SELECT ID, Colour, Section, Position, DateAdded, IsActive " +
                "FROM Routes WHERE IsActive = true";
            using (var conn = new SQLiteConnection(_connectionString))
            {
                conn.Open();
                return await conn.QueryAsync<Route>(sql);
            };
        }

        public async Task InsertRoute(AddRouteDto route)
        {
            const string sql = @"INSERT INTO Routes
                                    (Colour, Section, Position, DateAdded, IsActive)
                                VALUES
                                    (@Colour, @Section, @Position, @DateAdded, @IsActive)";
            using (var conn = new SQLiteConnection(_connectionString))
            {
                conn.Open();
                await conn.ExecuteAsync(sql,
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

        private async Task CreateDbIfNotExists()
        {
            if (!File.Exists("AppData/climbing.db"))
            {
                SQLiteConnection.CreateFile("AppData/climbing.db");
            }

            using (var cnn = new SQLiteConnection(_connectionString))
            {

                cnn.Open();
                await cnn.ExecuteAsync(
                    @"create table if not exists Routes
                (
                    ID                                   integer primary key AUTOINCREMENT,
                    Colour                                varchar(100) not null,
                    Section                              varchar(100) not null,
                    Position                             integer not null,
                    DateAdded                            text not null,
                    IsActive                             bool not null
                )");
            }
        }
    }
}
