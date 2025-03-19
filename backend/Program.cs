using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000", "http://192.168.2.102:3000") // Allow frontend
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials(); // Allows session cookies
        });
});

// Enable authentication & authorization
builder.Services.AddAuthentication("SessionAuth")
    .AddCookie("SessionAuth", options =>
    {
        options.Cookie.Name = ".AspNetCore.SessionAuth"; // Ensure the correct cookie name
        options.Cookie.HttpOnly = true; // Security: Prevent JavaScript access
        options.Cookie.SameSite = SameSiteMode.Lax; // Required for cross-origin authentication cookies
        options.Cookie.SecurePolicy = CookieSecurePolicy.None;
        options.ExpireTimeSpan = TimeSpan.FromMinutes(5);
        options.LoginPath = "/api/auth/login";
        options.AccessDeniedPath = "/api/auth/access-denied";

        // Ensure API returns JSON instead of redirecting
        options.Events = new CookieAuthenticationEvents
        {
            OnRedirectToLogin = ctx =>
            {
                ctx.Response.StatusCode = StatusCodes.Status401Unauthorized;
                ctx.Response.ContentType = "application/json";
                return ctx.Response.WriteAsync("{\"error\": \"Unauthorized\"}");
            },
            OnRedirectToAccessDenied = ctx =>
            {
                ctx.Response.StatusCode = StatusCodes.Status403Forbidden;
                ctx.Response.ContentType = "application/json";
                return ctx.Response.WriteAsync("{\"error\": \"Forbidden\"}");
            }
        };
    });

builder.Services.AddAuthorization();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// HTTPS redirection before everything
//app.UseHttpsRedirection();
// Apply CORS before authentication & session
app.UseCors("AllowFrontend");
//app.UseSession();
app.UseAuthentication(); // Authenticate the user
app.UseAuthorization(); // Then check permissions

app.MapControllers();
app.Run();

