export function Setup() {
  return (
    <div className="flex flex-col gap-6 py-4">
      <div className="space-y-1">
        <h3 className="text-base font-medium text-foreground">
          Getting Started
        </h3>
        <p className="text-sm text-muted-foreground">
          Follow these steps to set up MicFloat on your system.
        </p>
      </div>

      <ol className="space-y-6">
        <li className="flex gap-4">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
            1
          </span>
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-foreground">
              Get your API key
            </h4>
            <p className="text-sm text-muted-foreground">
              Sign up at{" "}
              <a
                href="https://portal.speechmatics.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-4 hover:text-primary/80"
              >
                Speechmatics
              </a>{" "}
              and copy your API key from the dashboard.
            </p>
          </div>
        </li>

        <li className="flex gap-4">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
            2
          </span>
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-foreground">
              Add your API key
            </h4>
            <p className="text-sm text-muted-foreground">
              Go to the <strong className="text-foreground">Settings</strong>{" "}
              tab and paste your Speechmatics API key. It will be stored
              securely on your device.
            </p>
          </div>
        </li>

        <li className="flex gap-4">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
            3
          </span>
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-foreground">
              Set up a keyboard shortcut
            </h4>
            <p className="text-sm text-muted-foreground">
              Create a system keyboard shortcut to run{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs text-foreground">
                micfloat --overlay
              </code>{" "}
              so you can launch the overlay from anywhere.
            </p>
            <div className="mt-2 rounded-lg border border-border bg-muted p-3 space-y-2">
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">Linux:</strong> Open your
                desktop environment's keyboard settings and add a custom
                shortcut pointing to the micfloat binary with the{" "}
                <code className="rounded bg-background px-1 py-0.5">
                  --overlay
                </code>{" "}
                flag.
              </p>
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">macOS:</strong> Use
                Automator or a tool like Raycast/Alfred to bind a hotkey to the
                command.
              </p>
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">Windows:</strong> Create a
                shortcut to the executable with the{" "}
                <code className="rounded bg-background px-1 py-0.5">
                  --overlay
                </code>{" "}
                argument, then assign a shortcut key in its properties.
              </p>
            </div>
          </div>
        </li>
      </ol>
    </div>
  )
}
