using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartEventPlanningSystem.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class mig_added_unique_index_eventRegister_entity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_EventRegisters_EventId",
                table: "EventRegisters");

            migrationBuilder.CreateIndex(
                name: "IX_EventRegisters_EventId_AppUserId",
                table: "EventRegisters",
                columns: new[] { "EventId", "AppUserId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_EventRegisters_EventId_AppUserId",
                table: "EventRegisters");

            migrationBuilder.CreateIndex(
                name: "IX_EventRegisters_EventId",
                table: "EventRegisters",
                column: "EventId");
        }
    }
}
