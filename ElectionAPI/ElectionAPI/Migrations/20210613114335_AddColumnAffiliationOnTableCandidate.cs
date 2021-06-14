using Microsoft.EntityFrameworkCore.Migrations;

namespace ElectionAPI.Migrations
{
    public partial class AddColumnAffiliationOnTableCandidate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Affiliation",
                table: "Candidates",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Affiliation",
                table: "Candidates");
        }
    }
}
