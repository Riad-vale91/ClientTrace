using Microsoft.EntityFrameworkCore;
using ServerTrace.Hubs;
using ServerTrace.Middleware;
using ServerTrace.Service;
using ServerTrace.SubscribeTableDependencies;

string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DEVLOGDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DEVLOGConnectionString")));

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                        builder =>
                        {
                            builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
                        });
});
builder.Services.AddSingleton<DashboardHub>();
builder.Services.AddSingleton<SubscribeDevTracerDbTabledDependency>();
builder.Services.AddSignalR();
var app = builder.Build();

var connectionString = app.Configuration.GetConnectionString("DEVLOGConnectionString");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.UseCors(MyAllowSpecificOrigins);
app.MapControllers();

app.UseSqlTableDependency<SubscribeDevTracerDbTabledDependency>(connectionString);
app.Run();
