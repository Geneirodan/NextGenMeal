﻿namespace Services.Options;

public class GoogleAuthOptions
{
    public const string Section = "Authentication:Google";
    public string ClientId { get; init; } = null!;
    public string ClientSecret { get; init; } = null!;
}
