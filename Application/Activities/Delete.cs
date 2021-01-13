using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);
                
                //prevent null reference exception
                if (activity == null) 
                {
                    throw new Exception("Could not find activity");
                }

                _context.Remove(activity);

                var success = await _context.SaveChangesAsync() > 0;

                //if changes saved to the database was greater than 1 i.e successful
                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}