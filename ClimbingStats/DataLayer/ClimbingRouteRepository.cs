using ClimbingStats.Models;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Dapper;
using ClimbingStats.Models.Enums;

namespace ClimbingStats.DataLayer
{
    public class ClimbingRouteRepository : IClimbingRouteRepository
    {
        private readonly string _dbFile;

        public ClimbingRouteRepository(IOptions<ClimbingConfig> options)
        {
            _dbFile = options.Value.ClimbingDbFile;
        }

        public async Task ClearRoutes(Section section)
        {
            const string sql = "UPDATE Routes SET IsActive = false WHERE section = @Section";
            using (var conn = await DbConnection.GetDbConnection(_dbFile))
            {
                conn.Open();
                await conn.ExecuteAsync(sql, new { section });
            };
        }

        public async Task<IEnumerable<Route>> GetRoutes(Section section)
        {
            const string sql = "SELECT ID, Colour, Section, Position, DateAdded, IsActive " +
                "FROM Routes WHERE section = @Section AND IsActive = true";
            using (var conn = await DbConnection.GetDbConnection(_dbFile))
            {
                conn.Open();
                return await conn.QueryAsync<Route>(sql, new { section });
            };
        }

        public async Task<IEnumerable<Route>> GetAllRoutes()
        {
            const string sql = "SELECT ID, Colour, Section, Position, DateAdded, IsActive " +
                "FROM Routes WHERE IsActive = true";
            using (var conn = await DbConnection.GetDbConnection(_dbFile))
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
            using (var conn = await DbConnection.GetDbConnection(_dbFile))
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
    }
}
