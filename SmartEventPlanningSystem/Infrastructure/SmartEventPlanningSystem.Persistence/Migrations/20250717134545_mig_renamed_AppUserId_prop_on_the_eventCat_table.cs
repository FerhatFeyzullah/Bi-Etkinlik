using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartEventPlanningSystem.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class mig_renamed_AppUserId_prop_on_the_eventCat_table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "EventCategories");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EventId",
                table: "EventCategories",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
