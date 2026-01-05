from pathlib import Path

def main():
    input_dir = input("Enter directory path (relative or absolute): ").strip()
    base_path = Path(input_dir).resolve()

    if not base_path.exists() or not base_path.is_dir():
        print("Invalid directory.")
        return

    output_path = Path.cwd() / "merged.txt"

    with open(output_path, "w", encoding="utf-8") as out:
        for file_path in sorted(base_path.rglob("*")):
            if file_path.is_file():
                try:
                    content = file_path.read_text(encoding="utf-8")
                except Exception:
                    continue  # skip binary / unreadable files

                relative = file_path.relative_to(base_path)

                out.write("\n" + "=" * 80 + "\n")
                out.write(f"FILE: {relative}\n")
                out.write("=" * 80 + "\n\n")
                out.write(content)
                out.write("\n\n")

    print(f"\nDone. Output saved to:\n{output_path}")

if __name__ == "__main__":
    main()
