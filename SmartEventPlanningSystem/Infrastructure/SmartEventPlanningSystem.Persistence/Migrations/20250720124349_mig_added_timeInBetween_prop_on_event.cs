using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartEventPlanningSystem.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class mig_added_timeInBetween_prop_on_event : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<TimeSpan>(
                name: "TimeInBetween",
                table: "Events",
                type: "interval",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TimeInBetween",
                table: "Events");
        }
    }
}
