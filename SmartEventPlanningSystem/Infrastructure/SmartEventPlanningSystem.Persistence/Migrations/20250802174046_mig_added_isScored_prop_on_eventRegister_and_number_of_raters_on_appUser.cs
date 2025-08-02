using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartEventPlanningSystem.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class mig_added_isScored_prop_on_eventRegister_and_number_of_raters_on_appUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsScored",
                table: "EventRegisters",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<decimal>(
                name: "Score",
                table: "AspNetUsers",
                type: "numeric",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<int>(
                name: "NumberOfRaters",
                table: "AspNetUsers",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsScored",
                table: "EventRegisters");

            migrationBuilder.DropColumn(
                name: "NumberOfRaters",
                table: "AspNetUsers");

            migrationBuilder.AlterColumn<int>(
                name: "Score",
                table: "AspNetUsers",
                type: "integer",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric");
        }
    }
}
