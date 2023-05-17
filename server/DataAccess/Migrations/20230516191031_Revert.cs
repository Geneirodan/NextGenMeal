using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class Revert : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Caterings_CateringId",
                table: "Orders");

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "Name", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "0", 0, "dd227089-dac9-4abf-a36b-5aa94097cd66", null, false, false, null, "Deleted user", null, null, null, null, false, "26a8cbf7-3702-4699-92af-20f1b4a40a31", false, null });

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Caterings_CateringId",
                table: "Orders",
                column: "CateringId",
                principalTable: "Caterings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Caterings_CateringId",
                table: "Orders");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "0");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Caterings_CateringId",
                table: "Orders",
                column: "CateringId",
                principalTable: "Caterings",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }
    }
}
