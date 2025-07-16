using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartEventPlanningSystem.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class mig_removed_string_areasofinterest_variable_from_appuser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AreasOfInterest",
                table: "AspNetUsers");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AreasOfInterest",
                table: "AspNetUsers",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
