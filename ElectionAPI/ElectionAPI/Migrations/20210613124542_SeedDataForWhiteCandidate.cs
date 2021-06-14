using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ElectionAPI.Migrations
{
    public partial class SeedDataForWhiteCandidate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Candidates",
                columns: new[] { "CandidateID", "Affiliation", "InsertData", "Legend", "Name", "Vice" },
                values: new object[] { 1, null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, "Branco", null });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Candidates",
                keyColumn: "CandidateID",
                keyValue: 1);
        }
    }
}
