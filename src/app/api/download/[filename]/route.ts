import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;

  try {
    const filePath = join(process.cwd(), "public", "modlume-mod.jar");
    const file = await readFile(filePath);

    const safeFilename = filename.endsWith(".jar") ? filename : `${filename}.jar`;

    return new NextResponse(file, {
      headers: {
        "Content-Disposition": `attachment; filename="${safeFilename}"`,
        "Content-Type": "application/java-archive",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "File not found" },
      { status: 404 }
    );
  }
}
