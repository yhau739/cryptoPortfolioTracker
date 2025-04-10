using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);
// certificate password = password123

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins(
                    "https://localhost:3000",
                    "https://crypto-portfolio-tracker-erosunty7-haus-projects-e2841cb0.vercel.app",
                    "https://crypto-portfolio-tracker-lilac.vercel.app"
                    ) // Allow frontend
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials(); // Allows session cookies
        });
});

builder.Services.AddMemoryCache();


// Enable authentication & authorization
builder.Services.AddAuthentication("SessionAuth")
    .AddCookie("SessionAuth", options =>
    {
        options.Cookie.Name = ".AspNetCore.SessionAuth"; // Ensure the correct cookie name
        // if httponly true then prevents js access
        //options.Cookie.HttpOnly = false; 
        // samsitemode lax only allows same domain access
        options.Cookie.SameSite = SameSiteMode.None; 
        // if secure = always then HTTPS only
        options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
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
if (app.Environment.IsDevelopment() || app.Environment.IsStaging())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.Use(async (context, next) =>
//{
//    context.Response.OnStarting(() =>
//    {
//        context.Response.Headers["Access-Control-Allow-Origin"] = "https://localhost:3000";
//        context.Response.Headers["Access-Control-Allow-Credentials"] = "true";
//        return Task.CompletedTask;
//    });

//    await next();
//});


// HTTPS redirection before everything
app.UseHttpsRedirection();
// Apply CORS before authentication & session
app.UseCors("AllowFrontend");
//app.UseSession();
app.UseAuthentication(); // Authenticate the user
app.UseAuthorization(); // Then check permissions

app.MapControllers();
app.MapGet("/", () => Results.Ok("API is running!"));

app.Run();

