export abstract class Mapper<TInput, TOutput> {
  public abstract map(input: TInput): TOutput;
}
