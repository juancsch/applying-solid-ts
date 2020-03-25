type Input = (location: string) => Promise<string>

type ReportCounted = {
	wordCount: number
}

type Output = (content: ReportCounted) => Promise<void>
