
# Git Commit Command

Follow these steps:

1. Check for unstaged changes
2. Write a git commit message in this structure:

    <commit_structure>
    First line: conventional commit format (type: concise description) (remember to use semantic types like feat, fix, docs, style, refactor, perf, test, chore, etc.)

    Optional bullet points if more context helps:

    - Keep the second line blank
    - Keep them short and direct
    - Focus on what changed
    - Always be terse
    - Don't overly explain
    - Drop any fluffy or formal language
    </commit_structure>

    Here are examples of that format:

    <example_1>
    feat: add user auth system

    - Add JWT tokens for API auth
    - Handle token refresh for long sessions
    </example_1>

    <example_2>
    fix: resolve memory leak in worker pool

    - Clean up idle connections
    - Add timeout for stale workers
    </example_2>

    <example_3>
    fix: typo in README.md
    </example_3>

    Very important note:
    <note_1>
    Do not respond with any of the examples. Your message must be based off the diff that is about to be provided, with a little bit of styling informed by the recent commits you're about to see.
    </note_1>

3. Stage the changes using the commit message that you wrote

4. Commit the changes to the main branch
