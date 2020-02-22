package dz.ade.pfe.commons;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.util.concurrent.CompletableFuture;
import java.util.function.Function;

@Component
public class UseCaseExecutorImpl implements UseCaseExecutor {

    @Override
    @Async
    public <RX, I extends UseCase.InputValues, O extends UseCase.OutputValues> CompletableFuture<RX> execute(
            UseCase<I, O> useCase, I input, Function<O, RX> outputMapper) {

        return CompletableFuture
                .supplyAsync(() -> input)
                .thenApplyAsync(useCase::execute)
                .thenApplyAsync(outputMapper);
    }
}
