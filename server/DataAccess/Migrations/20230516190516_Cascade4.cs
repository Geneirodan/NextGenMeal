using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class Cascade4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Caterings_CateringId",
                table: "Orders");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Caterings_CateringId",
                table: "Orders",
                column: "CateringId",
                principalTable: "Caterings",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Caterings_CateringId",
                table: "Orders");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Caterings_CateringId",
                table: "Orders",
                column: "CateringId",
                principalTable: "Caterings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
