using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class Cascade1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Caterings_CateringId",
                table: "Orders");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "0",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "d27b5a8b-2477-4214-87b1-238992d68022", "a03d4cd1-dd87-4606-97e6-34e476866622" });

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

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "0",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "771620ed-4ad4-4e02-81ed-68c67d9c66fa", "951fa934-8e5e-46ea-9956-26745e45a892" });

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
